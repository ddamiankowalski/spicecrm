<?php
/*********************************************************************************
* SugarCRM Community Edition is a customer relationship management program developed by
* SugarCRM, Inc. Copyright (C) 2004-2013 SugarCRM Inc.
* 
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU Affero General Public License version 3 as published by the
* Free Software Foundation with the addition of the following permission added
* to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
* IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
* OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
* 
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
* details.
* 
* You should have received a copy of the GNU Affero General Public License along with
* this program; if not, see http://www.gnu.org/licenses or write to the Free
* Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
* 02110-1301 USA.
* 
* You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
* SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
* 
* The interactive user interfaces in modified source and object code versions
* of this program must display Appropriate Legal Notices, as required under
* Section 5 of the GNU Affero General Public License version 3.
* 
* In accordance with Section 7(b) of the GNU Affero General Public License version 3,
* these Appropriate Legal Notices must retain the display of the "Powered by
* SugarCRM" logo. If the display of the logo is not reasonably feasible for
* technical reasons, the Appropriate Legal Notices must display the words
* "Powered by SugarCRM".
********************************************************************************/

namespace SpiceCRM\includes;

use SpiceCRM\includes\SugarObjects\SpiceConfig;

use SpiceCRM\includes\authentication\AuthenticationController;
use SpiceCRM\includes\utils\SpiceFileUtils;

/**
 * @internal
 * Upload file stream handler
 */
class UploadStream
{
    const STREAM_NAME = "upload";
    protected static $upload_dir;


    /**
     * Get upload directory
     * @return string
     */
    public static function getDir()
    {
        if (empty(self::$upload_dir)) {
            // if we have a tenantid add the tenant to the file
            $tenantid = AuthenticationController::getInstance()->systemtenantid;
            self::$upload_dir = rtrim(SpiceConfig::getInstance()->config['upload_dir'] . ($tenantid ? "/{$tenantid}" : ''), '/\\');
            if (empty(self::$upload_dir)) {
                self::$upload_dir = "upload";
            }
            if (!file_exists(self::$upload_dir)) {
                SpiceFileUtils::spiceMkdir(self::$upload_dir, 0755, true);
            }
        }
        return self::$upload_dir;
    }

    /**
     * Check if upload dir is writable
     * @return bool
     */
    public static function writable()
    {
        return is_writable(self::getDir());
    }

    /**
     * Register the stream
     */
    public static function register()
    {
        stream_register_wrapper(self::STREAM_NAME, __CLASS__);
    }

    /**
     * Get real FS path of the upload stream file
     * @param string $path Upload stream path (with upload://)
     * @return string FS path
     */
    public static function path($path)
    {
        $path = substr($path, strlen(self::STREAM_NAME) + 3); // cut off upload://
        $path = str_replace("\\", "/", $path); // canonicalize path
        if ($path == ".." || substr($path, 0, 3) == "../" || substr($path, -3, 3) == "/.." || strstr($path, "/../")) {
            return null;
        }
        return self::getDir() . "/" . $path;
    }

    /**
     * Ensure upload subdir exists
     * @param string $path Upload stream path (with upload://)
     * @param bool $writable
     * @return boolean
     */
    public static function ensureDir($path, $writable = true)
    {
        $path = self::path($path);
        if (!is_dir($path)) {
            return SpiceFileUtils::spiceMkdir($path, 0755, true);
        }
        return true;
    }

    public function dir_closedir()
    {
        closedir($this->dirp);
    }

    public function dir_opendir($path, $options)
    {
        $this->dirp = opendir(self::path($path));
        return !empty($this->dirp);
    }

    public function dir_readdir()
    {
        return readdir($this->dirp);
    }

    public function dir_rewinddir()
    {
        return rewinddir($this->dirp);
    }

    public function mkdir($path, $mode, $options)
    {
        return mkdir(self::path($path), $mode, ($options & STREAM_MKDIR_RECURSIVE) != 0);
    }

    public function rename($path_from, $path_to)
    {
        return rename(self::path($path_from), self::path($path_to));
    }

    public function rmdir($path, $options)
    {
        return rmdir(self::path($path));
    }

    public function stream_cast($cast_as)
    {
        return $this->fp;
    }

    public function stream_close()
    {
        fclose($this->fp);
        return true;
    }

    public function stream_eof()
    {
        return feof($this->fp);
    }

    public function stream_flush()
    {
        return fflush($this->fp);
    }

    public function stream_lock($operation)
    {
        return flock($this->fp, $operation);
    }

    public function stream_open($path, $mode)
    {
        $fullpath = self::path($path);
        if (empty($fullpath)) return false;
        if ($mode == 'r') {
            $this->fp = fopen($fullpath, $mode);
        } else {
            // if we will be writing, try to transparently create the directory
            $this->fp = @fopen($fullpath, $mode);
            if (!$this->fp && !file_exists(dirname($fullpath))) {
                mkdir(dirname($fullpath), 0755, true);
                $this->fp = fopen($fullpath, $mode);
            }
        }
        return !empty($this->fp);
    }

    public function stream_read($count)
    {
        return fread($this->fp, $count);
    }

    public function stream_seek($offset, $whence = SEEK_SET)
    {
        return fseek($this->fp, $offset, $whence) == 0;
    }

    public function stream_set_option($option, $arg1, $arg2)
    {
        return true;
    }

    public function stream_stat()
    {
        return fstat($this->fp);
    }

    public function stream_tell()
    {
        return ftell($this->fp);
    }

    public function stream_write($data)
    {
        return fwrite($this->fp, $data);
    }

    public function unlink($path)
    {
        unlink(self::path($path));
        return true;
    }

    public function url_stat($path, $flags)
    {
        return @stat(self::path($path));
    }

    public static function move_uploaded_file($upload, $path)
    {
        return move_uploaded_file($upload, self::path($path));
    }
}



/**
 * Exposing all APIes to preload bridge
 * so it can be accessible by Vue
 */

import * as _File from "./util/File"

export const File = _File;

import * as _VersionMgr from "./util/VersionMgr"

export const VersionMgr = _VersionMgr;

import * as _defaultSettings from "./settings/default"

export const defaultSettings = _defaultSettings;
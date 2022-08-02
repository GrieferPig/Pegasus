import {BaseDirectory, createDir} from '@tauri-apps/api/fs'

const TEMP_FOLDER = '.pegasus'

async function createTempDir() {
    await createDir(TEMP_FOLDER, {dir: BaseDirectory.Temp})
}
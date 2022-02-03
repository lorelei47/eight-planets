import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import global from "./global";

const loader = new GLTFLoader(global.manager);

//废弃，改用loaderManager加载
export function loader3d_pro(path, callback) {
    return new Promise((resolve) => {
        loader.load(
            path,
            function(glb) {
                callback(glb);
                resolve();
            },
            undefined,
            undefined
        );
    })
}

export function loader3d(path, callback) {
    loader.load(
        path,
        function(glb) {
            callback(glb);
        },
        undefined,
        undefined
    );
}
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader();

export function loader3d(path, callback) {
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
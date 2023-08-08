const cachedModel = {
    model: null,
    loaded: false,
};

export async function predict(img) {

}

export async function loadModel() {
    const model = await tf.loadLayersModel('model/model.json');
    model.summary();
    cachedModel.model = model;
    cachedModel.loaded = true;

}
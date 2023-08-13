const cachedModel = {
    model: null,
    loaded: false,
};

export async function predict(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let tensor = tf.browser.fromPixels(img)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .div(tf.scalar(255.0))
          .expandDims();
        cachedModel.model.predict(tensor).data().then(rs => resolve(rs));
      }
    });
  }


export async function loadModel() {
    tf.setBackend('cpu');
    const model = await tf.loadLayersModel('model/model.json');
    model.summary();
    cachedModel.model = model;
    cachedModel.loaded = true;
    document.querySelector('.loading').style.display = 'none';

}
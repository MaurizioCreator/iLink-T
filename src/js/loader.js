const dragAreaElement = document.querySelector(".drag_area");
const fileInput = dragAreaElement.querySelector("input");
const addFileButton = dragAreaElement.querySelector("button");
const addedImages = document.querySelector(".added_images");
const sendBtn = document.querySelector(".send_btn");

addFileButton.onclick = (e) => {
    e.preventDefault();
    fileInput.click();
}

fileInput.addEventListener("change", (e) => {
    dragAreaElement.classList.add("active");
    drawFiles(e.target.files);
});

dragAreaElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragAreaElement.classList.add("active");
});

dragAreaElement.addEventListener("dragleave", () => {
    dragAreaElement.classList.remove("active");
});

dragAreaElement.addEventListener("drop", (e) => {
    e.preventDefault();

    const previousFiles = Array.from(fileInput.files);
    const newFiles = Array.from(e.dataTransfer.files)

    const dataTransfer = new DataTransfer();

    previousFiles.forEach(file => dataTransfer.items.add(file));
    newFiles.forEach(file => dataTransfer.items.add(file));

    fileInput.files = dataTransfer.files;

    drawFiles(fileInput.files);
});

function convertBytesToReadable(bytes) {
    let count, size;
    for (count = 0; bytes > 1024; count++){
        bytes /= 1024;
    }
    switch (count){
        case 0: {
            size = ' b'
            break;
        }
        case 1: {
            size = ' kb'
            break;
        }
        case 2:{
            size = ' mb'
            break;
        }
        case 3:{
            size = ' gb'
            break;
        }
    }
    return ((bytes).toFixed(2) + size);
}

function lengthAdjustment(string) {
    if (string.length > 15){
        return string.substring(0, 15) + '...';
    }
    return string;
}

function drawFiles(fileList) {
    addedImages.innerHTML = '';
    dragAreaElement.classList.remove("active");

    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    const files = Array.from(fileList);

    files.forEach(file => {
        if (validExtensions.includes(file.type)) {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                const filePreview = document.createElement('div');
                filePreview.classList.add('image_preview');

                const imgElem = document.createElement('img');
                imgElem.src = fileReader.result;
                imgElem.classList.add('added_image');

                const imgInfo = document.createElement('div');
                imgInfo.classList.add('image_information');
                console.log(file);
                const fileName = document.createElement('span');
                fileName.classList.add('image_name');
                fileName.innerHTML = lengthAdjustment(file.name.replace('.jpg','').replace('.png',''));

                const fileDescription = document.createElement('span');
                fileDescription.classList.add('image_description');
                fileDescription.innerHTML = `${file.type.replace('image/','').toUpperCase()} ${convertBytesToReadable(file.size)}`

                const removeButton = document.createElement('button');
                const removeImg = document.createElement('img');
                removeImg.src = 'images/content/remove.svg';

                removeButton.onclick = (e) => {
                    e.preventDefault();

                    const files = Array.from(fileInput.files);

                    const dataTransfer = new DataTransfer();

                    files.filter(f => f.name !== file.name).forEach(f => dataTransfer.items.add(f));

                    fileInput.files = dataTransfer.files;
                    drawFiles(fileInput.files);
                    sendBtn.classList.remove('with_added_image');

                }
                imgInfo.appendChild(fileName);
                imgInfo.appendChild(fileDescription);

                removeButton.appendChild(removeImg);

                filePreview.appendChild(imgElem);
                filePreview.appendChild(imgInfo);
                filePreview.appendChild(removeButton);

                addedImages.appendChild(filePreview);

                sendBtn.classList.add('with_added_image');
            }
            fileReader.readAsDataURL(file);

        } else {
            alert(`${file.name} is not an Image File!`);
        }

    })
}

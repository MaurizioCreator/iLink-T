require("regenerator-runtime/runtime");

"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);
    const addedImages = document.querySelector(".added_images");
    const SendButtonBox = document.querySelector(".send_btn_box");
    const sendBtn = document.querySelector(".send_btn");


    async function formSend(event) {
        event.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);


        if (error === 0) {
            let res = await fetch('someFile.php', {
                method: 'POST',
                body: formData
            });

            const completedIndicator = document.createElement('div');
            completedIndicator.classList.add('completed');

            const imgCompleted = document.createElement('img');
            imgCompleted.src = 'images/content/completed.svg';

            const textCompleted = document.createElement('span');
            textCompleted.innerHTML = 'Completed';

            completedIndicator.appendChild(imgCompleted);
            completedIndicator.appendChild(textCompleted);

            SendButtonBox.appendChild(completedIndicator);

            sendBtn.setAttribute("disabled", "disabled");
            sendBtn.classList.add('disabled');

            if (res.ok) {
                let result = await res.json();
                alert(result.message);
                form.reset();
                addedImages.innerHTML = '';
            } else {
                alert('Что-то пошло не так :(');
                form.reset();
                addedImages.innerHTML = '';
                sendBtn.classList.remove('with_added_image');
            }

        } else {
            alert('Заполните все поля корректно.');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];

            i
            if (input.value === '') {
                error++;
            } else if (input.classList.contains('date')) {
                if (!validateDate(input.value)) {
                    error++;
                }
            }
        }
        return error;
    }

    function validateDate(value) {

        let pattern = /^([0-9]{2}).([0-9]{2}).([0-9]{4})$/;
        if (value === null || value === "" || !pattern.test(value)) {
            alert("Введена некорректная дата рождения.")
            return false;
        } else {
            return true
        }
    }

});


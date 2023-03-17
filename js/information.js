class InformationEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new InformationEvent();
        }
        return this.#instance;
    }

    addEventPhotoChangeClick() {
        const infoPhoto = document.querySelector(".info-photo");
        infoPhoto.onclick = () => {
            const photoFile = document.querySelector(".photo-file");
            photoFile.click();
        }
    }

    addEventPhotoChange() {
        const photoFile = document.querySelector(".photo-file");
        photoFile.onchange = () => {
            FileService.getInstance().ChangePhoto();
        }
        
    }

    addEventAboutMeModifyClick() {
        const aboutMeModifyButton = document.querySelector(".m-aboutme");
        aboutMeModifyButton.onclick = () => {
            const aboutMeSaveButton = document.querySelector(".s-aboutme");
            aboutMeSaveButton.classList.remove("button-hidden");
            aboutMeModifyButton.classList.add("button-hidden");

            const infoInputContainers = document.querySelectorAll(".info-input-container");
            infoInputContainers.forEach(infoInputContainer => {
                infoInputContainer.querySelector(".info-input").disabled = false;
            });
        }
    }

    addEventAboutMeSaveClick() {
        const aboutMeSaveButton = document.querySelector(".s-aboutme");
        aboutMeSaveButton.onclick = () => {
            const aboutMeModifyButton = document.querySelector(".m-aboutme");
            aboutMeModifyButton.classList.remove("button-hidden");
            aboutMeSaveButton.classList.add("button-hidden");

            const infoInputContainers = document.querySelectorAll(".info-input-container");
            const userInfo = InformationService.getInstance().userInfo;

            infoInputContainers.forEach(infoInputContainer => {
                const infoInput = infoInputContainer.querySelector(".info-input");
                userInfo[infoInput.id] = infoInput.value;
                infoInput.disabled = true;
            });

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }

        
    }

    addEventIntroduceModifyClick() {
        const introduceModifyButton = document.querySelector(".m-introduce");
        introduceModifyButton.onclick = () => {
            const introduceSaveButton = document.querySelector(".s-introduce");
            introduceSaveButton.classList.remove("button-hidden");
            introduceModifyButton.classList.add("button-hidden");

            const introduceInput = document.querySelector(".introduce-input");
            introduceInput.disabled = false;
        }
    }

    addEventIntroduceSaveClick() {
        const introduceSaveButton = document.querySelector(".s-introduce");
        introduceSaveButton.onclick = () => {
            const introduceModifyButton = document.querySelector(".m-introduce");
            introduceModifyButton.classList.remove("button-hidden");
            introduceSaveButton.classList.add("button-hidden");
            const introduceInput = document.querySelector(".introduce-input");
            introduceInput.disabled = true;

            const userInfo = InformationService.getInstance().userInfo;
            userInfo["introduce"] = introduceInput.value;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
    }
}

class InformationService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new InformationService();
        }
        return this.#instance;
    }

    userInfo = {};

    loadInfo() {
        this.loadInfoPhoto();
        this.loadInfoUser();
    }

    loadInfoPhoto() {
        const infoPhotoImg = document.querySelector(".info-photo img");
        const infoPhoto = localStorage.getItem("infoPhoto");
        if(infoPhoto == null) {
            infoPhotoImg.src = "./images/noimage.png";
        }else {
            infoPhotoImg.src = infoPhoto;
        }
    }

    loadInfoUser() {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if (this.userInfo == null) {
            this.userInfo = {};
            return;
        }
        Object.keys(this.userInfo).forEach(key => {
            const infoInput = document.querySelectorAll(".info-input"); 
            infoInput.forEach(input => {
                if(input.id == key) {
                    input.value = this.userInfo[key];
                }
            });

            if(typeof this.userInfo.introduce == "undefined") {
                return;
            }

            const introduceInput = document.querySelector(".introduce-input");
            introduceInput.value = this.userInfo.introduce;
        });
    }
}

class FileService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new FileService();
        }
        return this.#instance;
    }

    ChangePhoto() {
        const photoForm = document.querySelector(".photo-form");
        const formData = new FormData(photoForm);
        const fileValue = formData.get("file");

        if(fileValue.size == 0) {
            return;
        }

        this.showPreview(fileValue);
    }

    showPreview(fileValue) {
        const fileReader = new FileReader();
        // 파일을 호출하는 코드로 호출되면 onload가 됨
        fileReader.readAsDataURL(fileValue);
        fileReader.onload = (e) => {
            const photoImg = document.querySelector(".info-photo img");
            // 이벤트가 일어난 타겟의 결과를 가져옴
            photoImg.src = e.target.result;
            localStorage.setItem("infoPhoto", photoImg.src);
        }

    }
}
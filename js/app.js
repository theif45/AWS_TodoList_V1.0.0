window.onload = () => {
    AsideEvent.getInstance().addEventShowMenuButton();
    AsideEvent.getInstance().addEventMainChange();
    InformationService.getInstance().loadInfo();
    InformationEvent.getInstance().addEventPhotoChangeClick();
    InformationEvent.getInstance().addEventPhotoChange();
    // InformationEvent.getInstance().addEventButton();
    InformationEvent.getInstance().addEventAboutMeModifyClick();
    InformationEvent.getInstance().addEventAboutMeSaveClick();
    InformationEvent.getInstance().addEventIntroduceModifyClick();
    InformationEvent.getInstance().addEventIntroduceSaveClick();
    TodoEvent.getInstance().addEventTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    TodoService.getInstance();
}
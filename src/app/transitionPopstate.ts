import { Observable } from 'rxjs';

export const navigationCustom = ( goto: any ) => {
    startTx();
    setTimeout(() => {
        endTx();
        goto();
    }, 10);
}

export const startTx = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    var div = document.createElement('div');

    div.classList.add("loadScreen");
    div.classList.add('curtain');
    div.style.backgroundImage = '';
    div.style.backgroundColor = '#000';
    div.style.opacity = '1';
    div.setAttribute("id", "waitScreen");

    const waitScreen: any = document.getElementById("waitScreen");
    waitScreen.style.width = '100%';
}

export const endTx = () => {
    const waitScreen: any = document.getElementById("waitScreen");
    waitScreen.style.width = '0%';
    setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.body.style.pointerEvents = 'auto';
        document.body.removeChild(waitScreen);
    }, 1200);   
}
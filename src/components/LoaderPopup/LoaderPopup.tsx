import React from "react";
import colorsPalette from "../../colorsPalette.json"

export type LoadingReason = "dataBase" | "ai"
type LoadingText = `Angażowanie \nsztucznej inteligencji...` | `Przeszukiwanie \nbazy danych...`

type LoaderProps = {
    loaderReason: LoadingReason
}

const Loader: React.FC<LoaderProps> = ({ loaderReason } : LoaderProps) => {
 const text: LoadingText = loaderReason==="ai"
     ? `Angażowanie \nsztucznej inteligencji...`
     : `Przeszukiwanie \nbazy danych...`

    return (
        <div className="loader">
            <div className="spinner" role="spinner"></div>
            <div className="text">{text}</div>
        </div>
    );
};


type LoaderPopupProps = {
    open: boolean
    loadingReason: LoadingReason
}
const LoaderPopup: React.FC<LoaderPopupProps>= ({ open=false, loadingReason}:LoaderPopupProps)=> {
    return <dialog open={open} style={{backgroundColor: colorsPalette.disabledField}}>
        <Loader loaderReason={loadingReason}/>
      </dialog>
}

export default LoaderPopup
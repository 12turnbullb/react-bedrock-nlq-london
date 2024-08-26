import React, {useState, useEffect, useRef} from 'react';
import Chatbot from './chatbot_sources';
import { ResponseArrayProvider } from './ResponseArrayContext';
import { PromptArrayProvider } from './PromptArrayContext';
import BackgroundComponent from './BackgroundComponent';
import useLocalStorage from './useLocalStorage';
import pltw from './customer_images/pltw.jpg';

const { v4: uuidv4 } = require('uuid');

const App = () => {
    let bogus = pltw;
    const isInitialMount = useRef(true);
    const [inputIndexName, setIndexInputValue] = useState("abinbev_foundation-vector-embeddings");
    const [savedIndex, setSavedIndex] = useLocalStorage('savedIndex', inputIndexName);
    const [backgroundImage, setBackgroundImage] = useState(inputIndexName.replace("-vector-embeddings", "")); //Default background image
    const generated_uuid = uuidv4();
    //alert("cuustomer name: " + inputIndexName.replace("-vector-embeddings", ""));
    const getSavedIndex = () => {
        return savedIndex;
      };
    const changeBackground = (newImage) => {
        setBackgroundImage(getImageReference(newImage));
    }
    useEffect(() => {
        if (getSavedIndex()){
            //alert("got saved index: " + getSavedIndex());
            setIndexInputValue(getSavedIndex());
            setBackgroundImage(getImageReference(getSavedIndex().replace("-vector-embeddings", "")));
          }
        //alert("running App update");
    }, []);
   return (
       <div className="App" style={{ backgroundImage: backgroundImage}}>
           <button>NLQ</button>
        <BackgroundComponent imageUrl={backgroundImage} />
            <ResponseArrayProvider>
                <PromptArrayProvider>
                <Chatbot changeBackground={changeBackground} generated_uuid={generated_uuid} />
                </PromptArrayProvider>
            </ResponseArrayProvider>    
       </div>
    );
}

function getImageReference(imageName) {
    if (imageName === "pltw") {
        return pltw;
    }
    else {
        return pltw;
    }
}

export default App;

//const App = () => {
//    return (
//        <div className="App">
//            
//            <Chatbot />
//        </div>
//    );
//}
//return (
//       
//    <ArrayProvider>
//        <ChildComponent />
//    </ArrayProvider>
// );

//<BackgroundComponent imageUrl={backgroundImage} />
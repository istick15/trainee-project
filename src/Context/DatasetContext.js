import React,{ createContext } from "istanbul-lib-report";


const DatasetContext = createContext()
const DatasetContextProvider = props=> {
    return (
        <DatasetContext.Provider value={{ dataset: null }}>
          {props.children}
        </DatasetContext.Provider>
      );
}
const DatasetContextConsumer = DatasetContext.Consumer;
export {DatasetContext,DatasetContextProvider,DatasetContextConsumer}
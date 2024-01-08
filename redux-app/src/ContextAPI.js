import { createContext, useContext } from 'react';
import './ContextAPI.css';

const themeDefault = { border: '10px solid green' };
const themeContext = createContext(themeDefault);

function ContextAPI() {
  const theme = useContext(themeContext);

  return (
    <themeContext.Provider value={{border: '10px solid red'}}>
      <div className="root" style={theme}>
        <h1>Hello World</h1>
        <Sub1 />
      </div>
    </themeContext.Provider>
  );
}

const Sub1 = () => {
  const theme = useContext(themeContext);
  return (
    <themeContext.Provider value={{ border: '10px solid blue' }}>
      <div style={theme}>
        <h1>Sub1</h1>
        <Sub2 />
      </div>
    </themeContext.Provider>
  );
}

const Sub2 = () => {
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub2</h1>
      <Sub3 />
    </div>
  );
}

const Sub3 = () => {
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub3</h1>
    </div>
  );
}

export default ContextAPI;
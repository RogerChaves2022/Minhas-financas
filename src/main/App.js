import React from "react";

import Rotas from "./routes";
import Navbar from '../components/navbar';
import ProvedorAutenticacao from "./authProvider";

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/darkly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

class App extends React.Component {

  render() {
    return(
      <ProvedorAutenticacao>
      <Navbar/>
      <div className="container">
        <Rotas />

      </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;

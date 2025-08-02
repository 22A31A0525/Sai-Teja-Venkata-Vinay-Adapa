import editor from "./assets/code-editor-icon-vector.png";
import profile from "./assets/user-icon.png";
import git from './assets/github.png'
import './css/firstrender.css';
function FirstRender({name}) {

  return ( 
    <div className={`flex flex-col items-center justify-center h-screen ${name}`}>
      
    <div className="flex">
      <img src={editor} alt="editor" className="ring-1 w-12 highlight-icons rounded-3xl" />
      <img src={profile} alt="editor" className="ring-1 w-12
      highlight-icons rounded-3xl" />
      <img src={git} alt="editor" className="ring-1 w-12
      highlight-icons rounded-3xl" />
    </div> 
  
    <div className="text-white text-7xl font-bold  mt-5 mb-2 max-sm:text-4xl max-[450px]:text-4xl ">
        <span className="greeting animate-fadeIn">Welcome </span>
        <span className="greeting animate-fadeIn"> To </span>
        <span className="greeting animate-fadeIn">  My </span>
    </div>
    
    <div  className="text-white text-7xl  font-bold mb-3  mt-5 max-sm:text-4xl max-[450px]:text-4xl">
        <span className="title movetop"> Portfolio</span>
        <span className="title movetop"> Website </span>
      </div>
      <div className="text-container flex text-1xl mt-5 max-sm:text-[9px]">
  <span className="url-entry">https://22a31a0525.github.io/Sai-Teja-Venkata-Vinay-Adapa</span>
</div>

    </div>
  );
}

export default FirstRender;

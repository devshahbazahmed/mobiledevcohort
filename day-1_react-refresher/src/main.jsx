import { createRoot } from 'react-dom/client';
import App from './App';

// const h1 = React.createElement(
//   "h1",
//   {
//     className: "title",
//     id: "heading",
//   },
//   "Welcome to mobile dev!",
// );

let name = 'App';

createRoot(document.getElementById('root')).render(
  <>
    <h1 className="title" id="heading">
      Welcome to Mobile dev! {name}
    </h1>
    <App />
  </>
);

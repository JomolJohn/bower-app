import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li><a href="https://bower.io/">Home</a></li>
                <li><a href="https://bower.io/docs/creating-packages/">Creating</a></li>
                <li><a href="https://bower.io/docs/api/">API</a></li>
                <li><a href="https://bower.io/docs/config/">Configuration</a></li>
                <li><a href="https://bower.io/docs/pluggable-resolvers/">Pluggable Resolvers</a></li>
                <li><a href="https://bower.io/docs/tools/">Tools</a></li>
                <li><a href="https://bower.io/docs/about/">About</a></li>
            </ul>
            <div className='sidebar-text'>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
        </aside>
      );
};
  
export default Sidebar;
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    
   
       const auth = JSON.parse(localStorage.getItem("auth"));

       const  loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
        

    const navigate = useNavigate();

    const logoutHandler = () => {

        localStorage.clear();
        navigate("/")
    }

/*
    const HomeNavigation = () => {

        return (
            <ul class="navigation__list">
                <li class="navigation__item">
                    <a href="/login" class="navigation__link">Login</a>
                </li>
                <li class="navigation__item">
                    <a href="#section-about" class="navigation__link">About WOV Smart</a>
                </li>
                <li class="navigation__item">
                    <a href="#features" class="navigation__link">Product Features</a>
                </li>
                <li class="navigation__item">
                    <a href="#industry" class="navigation__link"
                    >Industries </a
                    >
                </li>
                <li class="navigation__item">
                    <a href="#story" class="navigation__link">Success Story</a>
                </li>
                <li class="navigation__item">
                    <a href="#popup" class="navigation__link">Book  Demo</a>
                </li>
            </ul>

        );
    }


    const UserNavigation = () => {

        if (auth != null && loginDetails?.body?.role==='admin') {
            return (


                <ul className="Navigation__list">
                    <li className="Navigation__item">
                        <a href="/home/user/registration" class="navigation__link">Create User</a>
                    </li>


                    <li className="Navigation__item">
                        <a href="/home/admin/project/add" class="navigation__link">Create Project</a>
                    </li>

                    <li className="Navigation__item">
                        <a href="/home/admin/assign" class="navigation__link">Assign Project </a>
                    </li>
                    <li className="Navigation__item">
                        <a href="/" class="navigation__link" onClick={logoutHandler}>Logout </a>
                    </li>



                </ul>

            )

        }
        else {
            return (
                <ul className="Navigation__list">
                    <li className="Navigation__item">
                        <a href="/home/project/dashboard" class="navigation__link">Project Dashboard </a>
                    </li>
                    <li className="Navigation__item">
                        <a href="#" class="navigation__link" onClick={logoutHandler}>Logout </a>
                    </li>

                </ul>
            )





        }


    }

    */
    return (


        <div class="navigation">
            <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />

            <label for="navi-toggle" class="navigation__button">
                <span class="navigation__icon">&nbsp;</span>
            </label>

            <div class="navigation__background">&nbsp;</div>

            <nav class="navigation__nav">

                {
                    (auth === 'true' && loginDetails?.body?.role==='admin') ? <div>
                                 
                       
                          
                            <ul className="Navigation__list">
                                <li className="Navigation__item">
                                    <a href="/home/user/registration" class="navigation__link">Create User</a>
                                </li>


                                <li className="Navigation__item">
                                    <a href="/home/admin/project/add" class="navigation__link">Create Project</a>
                                </li>

                                <li className="Navigation__item">
                                    <a href="/home/admin/assign" class="navigation__link">Assign Project </a>
                                </li>
                                <li className="Navigation__item">
                                    <a href="/" class="navigation__link" onClick={logoutHandler}>Logout </a>
                                </li>



                           </ul>
                         

                    </div>


                    :
                        <ul class="navigation__list">
                            <li class="navigation__item">
                                <a href="/login" class="navigation__link">Login</a>
                            </li>
                            <li class="navigation__item">
                                <a href="#section-about" class="navigation__link">About WOV Smart</a>
                            </li>
                            <li class="navigation__item">
                                <a href="#features" class="navigation__link">Product Features</a>
                            </li>
                            <li class="navigation__item">
                                <a href="#industry" class="navigation__link"
                                >Industries </a
                                >
                            </li>
                            
                        </ul>










                }
            </nav>
        </div>
    )
};
export default NavBar;


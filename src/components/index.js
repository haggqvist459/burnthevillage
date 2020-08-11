//components
import Footer from './footer';
import Hamburger from './hamburger';
import Header from './header';
import MemberList from './memberList';
import ViewPlayer from './viewPlayer';
import WarList from './warList';
import { PekkaLoader } from '../components/styledmaterial/loader'

//utils
import { AuthContext, AuthProvider } from './utils/auth';
import firebase from './utils/firebaseConfig';
import PrivateRoute from './utils/privateRoute';

//utils - cloud functions
import { PlayerByTag, ClanByTag, CurrentWar } from './utils/cloudFunctions';

//utils - constants
import { local_constants } from './utils/constants';

//styled material 
import { UploadButton, SignButton } from './styledmaterial/buttons';
import { SignField } from './styledmaterial/textFields';
import { UploadIcon } from './styledmaterial/icons';


export {
    Footer, Hamburger, Header, MemberList, ViewPlayer, WarList, PekkaLoader,
    AuthContext, AuthProvider, firebase, PrivateRoute,
    UploadButton, SignButton, SignField, UploadIcon,
    PlayerByTag, ClanByTag, CurrentWar,
    local_constants,
};
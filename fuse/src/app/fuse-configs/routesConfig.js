import FuseUtils from '@fuse/utils';
import RootConfig from 'app/main/pages/root/RootConfig';

import LoginConfig from 'app/main/pages/auth/login/LoginConfig';
import RegisterConfig from 'app/main/pages/auth/register/RegisterConfig';
import { authRoles } from 'app/auth';

const routeConfigs = [LoginConfig, RegisterConfig, RootConfig];

const routes = [...FuseUtils.generateRoutesFromConfigs(routeConfigs, authRoles.user)];

export default routes;

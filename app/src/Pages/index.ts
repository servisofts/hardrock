import { SPageListProps } from 'servisofts-component'
import Home from './Home';
import Carga from './Carga';
import Ajustes from './Ajustes';
import Inicio from './Inicio';

const Pages: SPageListProps = {
    "/": Inicio,
    "carga": Carga,
    "home":Home,
    "ajustes":Ajustes,
}

export default Pages;
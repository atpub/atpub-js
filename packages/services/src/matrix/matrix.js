import { Service } from '../../service.js';
import icon from './matrix.svg';

export default new Service('matrix', {
    name: "Matrix",
    urlPattern: 'https://matrix.to/#/@{identifier}',
    icon,
    renderFormat: '@{identifier}'
})

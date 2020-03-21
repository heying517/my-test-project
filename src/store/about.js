import { observable, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class About {
  @observable aboutData = 'this is about';
}

const about = new About();

export default about;

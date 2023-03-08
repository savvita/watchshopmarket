
import FormItemTextArea from '../FormItems/FormItemTextArea';

import { TabPane } from 'reactstrap';

const DescriptionTab = ({ item, tabId, setItem }) => {
    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            <FormItemTextArea name="description" title="Опис" initialValue={ item && item.description } onInput={ (value) => setItem({ ...item, description: value }) } />
        </TabPane>
    );
}

export default DescriptionTab;
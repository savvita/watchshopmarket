
import FormItemImageFile from '../FormItems/FormItemImageFile';

import { TabPane } from 'reactstrap';

const ImageTab = ({ item, tabId, setImages }) => {
    if(!tabId || !setImages) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            <FormItemImageFile initialValues={ item && item.images } onChange={ (imgs => setImages([...imgs])) } />
        </TabPane>
    );
}

export default ImageTab;
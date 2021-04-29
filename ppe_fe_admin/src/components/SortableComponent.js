import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({image, id}) =>
    <figure
        className={`inline-block float-left ml-2 relative ${!image ? `spinner` : ``}`}
    >
        <input type="hidden" name={`files[images][]`} value={image} />
        <button
            type="button"
            className=" absolute top-0 right-0 mt-1 mr-1 z-10 bg-white text-gray-800 h-6 w-6 rounded-full hover:bg-indigo-700 hover:text-white flex items-center justify-center"
        >
            <i className="text-base font-bold material-icons">close</i>
        </button>
        <div className="w-20">
            <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                { image &&
                <img
                    alt=""
                    src={image}
                    className="absolute h-full w-full object-cover"
                />
                }
            </div>
        </div>
    </figure>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map(({id, image}, key) => (
                <SortableItem key={id} index={key} image={image} id={id} />
            ))}
        </div>
    );
});

class SortableComponent extends Component {
    state = {
        items: this.props.filesArr,
    };
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} axis={"x"}/>;
    }
}
export default SortableComponent

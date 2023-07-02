import React, { Component } from 'react'

export class MultipleChoices extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: []
        }
    }
    componentDidMount() {
        console.log(this.state.selected)
    }
    onCheck = (e) => {
        let filteredItem = this.state.selected.filter(item => item === e.target.value);
        if (filteredItem[0] === e.target.value) {
            var arr = [...this.state.selected];
            let index = arr.indexOf(e.target.value)
            if (index !== -1) {
                arr.splice(index, 1);
                this.state.selected = arr;
            }
            console.log(this.state.selected);
        } else {
            this.state.selected.push(e.target.value);
            console.log(this.state.selected);
        }
        this.props.setValue(this.state.selected);
    }
    render() {
        return (
            this.props.checks.map((item, i) => (
                <div key={i} className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        name={item}
                        onChange={this.onCheck}
                        placeholder="Your answer"
                        value={item}
                    />
                    <label>{item}</label>
                </div>
            ))
        )
    }

}

export default MultipleChoices
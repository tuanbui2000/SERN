import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ManageDoctor.scss"
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];



const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: '',
            description: '',
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers !== this.props.listUsers) {
        //     this.setState({
        //         usersRedux: this.props.listUsers
        //     })
        // }
    }





    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState( {
                contentHTML: html,
                contentMarkdown: text,
            }
        )
    }
    handleSaveChangeContentMarkdown = () => {
console.log("check state : ", this.state);
   }


    handleChange = selectedOption => {
        this.setState({ selectedOption }   );
    };


    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })

    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Them thong tin doctor</div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            // className='form-control'
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
fgh
                    </div>
                    <div className='content-right'>
                        <label>thông tin giiowis thiệu</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>

                </div>


                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={ this.handleEditorChange} />
                </div>
                <button
                    onClick={() => this.handleSaveChangeContentMarkdown()}
                    className='save-content-doctor'>Lưu thông tin</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
      

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

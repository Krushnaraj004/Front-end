import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor:"#FFA500",
        borderRadius:"20px",
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function AddProductModal(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [Product, setProduct] = useState({
        ProductName: "",
        Description: "",
        Price: "",
        Picture: "",
    });
    //handle change
    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...Product, [name]: value });
    };
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const uploadSingleFile = (e) => {
        if (e.target.files[0]) {
            // console.log("e.target.files[0]: ", e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                // console.log("reader.result: ", reader.result);
                setProduct({ ...Product, ["Picture"]: reader.result });
                // setFile(reader.result);
            };
        }
    };

    return (
        <div>
            <button type="button" class="button" onClick={openModal}>
                Add products
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="addbox">
                    <div>
                        <label>
                            Product name
                        </label>
                        &nbsp;&nbsp;
                        <input
                            name="ProductName"
                            onChange={handleProductChange}
                            type="text"
                            className="tbox"
                            placeholder="ProductName"
                        />
                    </div>
                    <br/>
                    <div className="boxm1">
                        <label>
                            Description
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            name="Description"
                            onChange={handleProductChange}
                            type="text"
                            placeholder="Description"
                            className="tbox"
                        />
                    </div>
                    <br />
                    <div className="boxm1">
                        <label>
                            Price
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            name="Price"
                            onChange={handleProductChange}
                            type="number"
                            placeholder="Price"
                            className="tbox"
                        />
                    </div>
                    <br />
                    <div className="boxm1">
                        <label>
                            Choose image
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            // disabled={loader}
                            type="file"
                            // disabled={file || loader}
                            className="form-control"
                            onChange={uploadSingleFile}
                        />
                    </div>
                    <br />
                    <div>
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    props.addProductApi(Product, closeModal);
                                }}
                                className="button"
                            >
                                Add
                            </button>&nbsp;&nbsp;
                            <button
                                type="button"
                                onClick={closeModal}
                                className="button"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AddProductModal;

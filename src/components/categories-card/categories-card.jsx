import React from "react";
import styles from "./categories-card.module.css";
import Modal from "../modal/modal";
import CategoryOperationModal from "../category-operation-modal/category-operation-modal";
import { ReactComponent as EditButton } from "../../images/edit.svg";
import { ReactComponent as CloseButton } from "../../images/close.svg";
import AddingCategoryModal from "../adding-category-modal/adding-category-modal";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../services/actions/category";

const CategoriesCard = ({ title, image, id, sum, type }) => {
    const dispatch = useDispatch();
    const [modalOparetionActive, setModalOparetionActive] = React.useState(false);
    const [modalCategoryActive, setModaCategoryActive] = React.useState(false);
    const handleToggleOperationModal = () => {
        setModalOparetionActive(!modalOparetionActive);
    };
    const handleToggleCategoryModal = () => {
        setModaCategoryActive(!modalCategoryActive);
    };

    const handleDeleteCategory = () => {
        dispatch(deleteCategory(id));
    };

    return (
        <>
            <div onClick={handleToggleOperationModal} className={styles.categories_card__container}>
                <h3 className={styles.categories_card__title}>{title}</h3>
                <div className={styles.categories_card__image_container}>
                    <img className={styles.categories_card__image} src={image} alt="Категория" />
                </div>
                <p className={styles.categories_card__balance}>{`₽ ${sum}`}</p>
                <div className={styles.categories_card__func}>
                    <EditButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setModaCategoryActive(!modalCategoryActive);
                        }}
                        className={`${styles.func__images} ${styles.func__images_edit}`}
                    />
                    <CloseButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory();
                        }}
                        className={`${styles.func__images} ${styles.func__images_close}`}
                    />
                </div>
            </div>
            {modalOparetionActive && (
                <Modal title={title} handleToggleModal={handleToggleOperationModal}>
                    <CategoryOperationModal
                        handleToggleModal={handleToggleOperationModal}
                        isCreateNewCategory={true}
                        categoryId={id}
                        image={image}
                        type={type}
                    />
                </Modal>
            )}
            {modalCategoryActive && (
                <Modal title={"Отредактировать"} handleToggleModal={handleToggleCategoryModal}>
                    <AddingCategoryModal id={id} type={type} handleToggleModal={handleToggleCategoryModal} />
                </Modal>
            )}
        </>
    );
};

export default CategoriesCard;

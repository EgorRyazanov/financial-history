import React from "react";
import styles from "./categories.module.css";
import CategoriesCard from "../categories-card/categories-card";
import Modal from "../modal/modal";
import addButton from "../../images/add-button.svg";
import AddingCategoryModal from "../adding-category-modal/adding-category-modal";

const Categories = ({ data, title, type }) => {
  const [modalActive, setModalActive] = React.useState(false);
  const handleToggleModal = () => {
    setModalActive(!modalActive);
  };
  return (
    <div className={styles.categories__container}>
      <h2 className={styles.categories__title}>{title}</h2>
      <div className={styles.categories__cards_container}>
        {data.map((element, index) => (
          <CategoriesCard key={index} title={element.name} image={element.img} id={element.id} type={element.type} sum={element.sum} />
        ))}
        <div data-test-id="categories-add" onClick={handleToggleModal} className={styles.categories__card_container}>
          <img src={addButton} className={styles.categories__card_image} alt="Категория" />
        </div>
      </div>
      {modalActive && (
        <Modal title={"Добавить категорию"} handleToggleModal={handleToggleModal}>
          <AddingCategoryModal type={type} handleToggleModal={handleToggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Categories;

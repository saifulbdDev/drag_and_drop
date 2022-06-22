const draggables = document.querySelectorAll(".draggable");
const boxs = document.querySelectorAll(".box");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

boxs.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    const colorsNode = box.querySelectorAll(".draggable");
    const colors = Array.from(colorsNode);
    const afterElement = getDragAfterElement(box, e.clientY);
    const draggable = document.querySelector(".dragging");
    const foundId = colors.find((element) => element.id === draggable.id);
   
    return foundId?.id
      ? false
      : afterElement == null
      ? box.appendChild(draggable)
      : box.insertBefore(draggable, afterElement);
  });
});

function getDragAfterElement(box, y) {
  const draggableElements = [
    ...box.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

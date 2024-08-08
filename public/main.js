// function deleteProduct(id) {
//   const result = confirm("Are you sure you want to delete this product?");
//   if (result) {
//     fetch("/delete-product/" + id, {
//       method: "POST",
//     }).then((res) => {
//       if (res.ok) {
//         // location.reload();
//         window.location.href = "/";
//       }
//     });
//   }
// }

async function deleteProduct(id) {
  const confirmDeletion = confirm(
    "Are you sure you want to delete this product?"
  );
  if (confirmDeletion) {
    try {
      const response = await fetch(`/delete-product/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error occurred while deleting the product:", error);
    }
  }
}

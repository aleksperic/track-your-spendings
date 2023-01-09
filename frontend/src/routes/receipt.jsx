import { Form, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const id = params.receiptId
  try {
    const response = await fetch(`http://localhost:8000/api/receipt/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    });
    return response.json()

  } catch (error) {
    console.error(error);
  }
}

export default function Receipt() {
  const receipt = useLoaderData();

  return (
    <div id="receipt">
      <div>
        <h1>
          {receipt.store ? (
            <>
              ID: {receipt.id}
              <br />
              Store: {receipt.store}
              <br />
              Total price: {receipt.total_price}
              <br />
              Tax price: {receipt.tax_price}
              <br />
              Receipt org: {receipt.receipt_org}
              <br />


            </>
          ) : (
            <i>No receipt</i>
          )}{" "}

        </h1>

        <div>
          <Form action="edit">
            {/* <label htmlFor="name">Store: </label>
            <input type="text" id="name" value={receipt.store} onChange="" />
            <label htmlFor="name">Price: </label>
            <input type="text" id="name" value={receipt.total_price} onChange="" />
            <label htmlFor="name">Tax price: </label>
            <input type="text" id="name" value={receipt.tax_price} onChange="" /> */}
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
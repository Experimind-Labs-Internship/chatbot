import React from "react";

export default function Invoice({ order }) {
  const address = order.shippingAddress || {};

  return (
    <div
      id="invoice"
      style={{
        width: "794px",
        background: "#ffffff",
        padding: "40px",
        color: "#2E2A27",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "3px solid #465348",
          paddingBottom: "25px",
        }}
      >
        <div>

          <img
            src="https://res.cloudinary.com/uejgq1gu/image/upload/v1784818786/logo_r2eqkh.png"
            alt="logo"
            style={{
              width: "180px",
            }}
          />

          <p
            style={{
              marginTop: 10,
              color: "#777",
            }}
          >
            Luxury Women's Fashion
          </p>

        </div>

        <div style={{ textAlign: "right" }}>

          <h1
            style={{
              color: "#465348",
              marginBottom: 10,
            }}
          >
            INVOICE
          </h1>

          <p>
            Invoice #
            {order.id.slice(0,8).toUpperCase()}
          </p>

          <p>
            {order.createdAt?.toDate().toLocaleDateString("en-IN")}
          </p>

        </div>

      </div>

      {/* Customer */}

      <div
        style={{
          marginTop: 40,
          background: "#F7F4EF",
          padding: 25,
          borderRadius: 12,
        }}
      >
        <h2
          style={{
            color: "#465348",
            marginBottom: 20,
          }}
        >
          Customer Details
        </h2>

        <p>
          <strong>{address.fullName}</strong>
        </p>

        <p>{address.email}</p>

        <p>{address.phone}</p>

        <p>{address.line1}</p>

        <p>
          {address.city},
          {" "}
          {address.state}
        </p>

        <p>{address.pincode}</p>

      </div>
            {/* Products */}

      <div
        style={{
          marginTop: 40,
        }}
      >
        <h2
          style={{
            color: "#465348",
            marginBottom: 25,
          }}
        >
          Ordered Items
        </h2>

        {order.items?.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ECE8E3",
              borderRadius: "16px",
              padding: "18px",
              marginBottom: "18px",
              background: "#FCFBF9",
            }}
          >
            {/* Product Image */}

            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "90px",
                height: "110px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            {/* Product Info */}

            <div
              style={{
                flex: 1,
                marginLeft: "25px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  marginTop: "10px",
                  color: "#777",
                }}
              >
                Size :
                <strong> {item.size}</strong>
              </p>

              <p
                style={{
                  color: "#777",
                }}
              >
                Quantity :
                <strong> {item.quantity}</strong>
              </p>
            </div>

            {/* Price */}

            <div
              style={{
                textAlign: "right",
              }}
            >
              <p
                style={{
                  color: "#777",
                  marginBottom: 10,
                }}
              >
                Price
              </p>

              <h2
                style={{
                  color: "#465348",
                  margin: 0,
                }}
              >
                ₹{item.price.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
        ))}

      </div>
            {/* Order Summary */}

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: "340px",
            background: "#F7F4EF",
            borderRadius: "16px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              color: "#465348",
              marginTop: 0,
              marginBottom: "20px",
            }}
          >
            Order Summary
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span>Subtotal</span>

            <strong>
              ₹{order.subtotal?.toLocaleString("en-IN")}
            </strong>
          </div>

          {order.discount > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                color: "#2E8B57",
              }}
            >
              <span>Discount</span>

              <strong>
                -₹{order.discount.toLocaleString("en-IN")}
              </strong>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span>Shipping</span>

            <strong>FREE</strong>
          </div>

          <hr
            style={{
              margin: "18px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#465348",
            }}
          >
            <span>Total</span>

            <span>
              ₹{order.total?.toLocaleString("en-IN")}
            </span>
          </div>

          <div
            style={{
              marginTop: "25px",
              background: "#EAF8EE",
              color: "#1C7C3E",
              textAlign: "center",
              padding: "12px",
              borderRadius: "12px",
              fontWeight: "bold",
            }}
          >
            ✅ Payment Successful
          </div>
        </div>
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: "60px",
          borderTop: "2px solid #ECE8E3",
          paddingTop: "25px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            color: "#465348",
            marginBottom: "10px",
          }}
        >
          Thank you for shopping with YUMI DXB Fashion ❤️
        </h3>

        <p
          style={{
            color: "#777",
            marginBottom: "5px",
          }}
        >
          We truly appreciate your purchase.
        </p>

        <p
          style={{
            color: "#999",
            fontSize: "14px",
          }}
        >
          support@yumidxbfashion.com
        </p>
      </div>

    </div>
  );
}
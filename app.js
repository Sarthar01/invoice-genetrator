const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dummy sample data
const sampleData = {
    sellerName: "Varasiddhi Silk Exports",
    sellerAddress: "75, 3rd Cross, Lalbagh Road, Bengaluru, Karnataka, 560027, IN",
    billingAddress: "Madhu B\nEurofins IT Solutions India Pvt Ltd, 1st Floor\nMaruti Platinum, Lakshminarayana Pura, AECS Layout\nBENGALURU, KARNATAKA, 560037\nIN",
    shippingAddress: "Madhu B\nEurofins IT Solutions India Pvt Ltd, 1st Floor\nMaruti Platinum, Lakshminarayana Pura, AECS Layout\nBENGALURU, KARNATAKA, 560037\nIN",
    orderNumber: "403-3225714-7676307",
    orderDate: "28.10.2019",
    invoiceNumber: "IN-761",
    invoiceDate: "28.10.2019",
    gstNumber: "29AACFV3325K1ZY",
    items: [
        {
            description: "Varasiddhi Silks Men's Formal Shirt (SH-05-42, Navy Blue, 42)",
            unitPrice: 850.00,
            quantity: 1,
            discount: 0.00,
            netAmount: 850.00,
            taxRate: 5,
            taxAmount: 42.50,
            totalAmount: 892.50
        },
        {
            description: "Varasiddhi Silks Men's Formal Shirt (SH-05-40, Navy Blue, 40)",
            unitPrice: 850.00,
            quantity: 1,
            discount: 0.00,
            netAmount: 850.00,
            taxRate: 5,
            taxAmount: 42.50,
            totalAmount: 892.50
        }
    ],
    totalAmountInWords: "One Thousand Seven Hundred And Eighty-five only"
};

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate-invoice', (req, res) => {
    const data = req.body;
    try {
        data.items = JSON.parse(data.items);  // Parse the items JSON string
    } catch (e) {
        data.items = [];  
    }
    res.render('invoice', { data });
});

app.get('/sample-invoice', (req, res) => {
    res.render('invoice', { data: sampleData });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

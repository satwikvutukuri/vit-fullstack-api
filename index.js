import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "venkata_satwik_vutukuri";  
const DOB = "27122004";        
const EMAIL = "satwikvutukuri@gmail.com";
const ROLL_NUMBER = "22BCE8747";


function alternatingCaps(str) {
    let result = "";
    let makeUpper = true;
    for (let ch of str) {
        if (/[a-zA-Z]/.test(ch)) {
            result += makeUpper ? ch.toUpperCase() : ch.toLowerCase();
            makeUpper = !makeUpper;
        }
    }
    return result;
}

app.post("/bfhl", (req, res) => {
    try {
        const data = req.body.data || [];

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;

        for (let item of data) {
            if (/^-?\d+$/.test(item)) {
                const num = parseInt(item, 10);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                special_characters.push(item);
            }
        }

        const concat_string = alternatingCaps(
            alphabets.join("").split("").reverse().join("")
        );

        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

export default app;

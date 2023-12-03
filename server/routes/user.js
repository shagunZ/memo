import express from "express"
import { User } from "../models/user.js";
import { 
    getMyProfile,
    register, 
    login,
    logout
    // getUserDetails,
    // specialFunc,
    // updateUser,
    // deleteUser 
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);

router.get("/me",isAuthenticated,getMyProfile);

// router.get("/userid/special",specialFunc)

// router
//     .route("/userid/:id")
//     .get(getUserDetails)
//     .put(updateUser)
//     .delete(deleteUser);


// router.put("/userid/:id",updateUser )
// router.delete("/userid/:id",deleteUser )


//try to keep dynamic route at the end bcz js code works in order


export default router;


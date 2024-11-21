import express from "express";
import User from "../mongodb/models/User.js";

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  const { nickname, email, password } = req.body;

  try {
    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
    }

    // 사용자 생성
    const newUser = new User({ ID, email, password });
    await newUser.save();

    res.status(201).json({ message: "회원가입 성공", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 사용자 확인
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 비밀번호 검증
    if (password !== user.password) {
      return res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
    }

    res.status(200).json({ message: "로그인 성공", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 이메일 중복 확인
router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ available: false, message: "이미 사용 중인 이메일입니다." });
    }
    res
      .status(200)
      .json({ available: true, message: "사용 가능한 이메일입니다." });
  } catch (error) {
    console.error("Error during email check:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

export default router;

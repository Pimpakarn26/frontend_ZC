import React from 'react';

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://cdn-icons-png.flaticon.com/256/9018/9018884.png" // แทนที่ด้วย URL ของภาพที่คุณต้องการ
          alt="Hero"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">ยินดีต้อนรับสู่ตัวตรวจสอบโซนการจัดส่งของร้านค้า!</h1>
          <p className="py-6">
          ตรวจสอบว่าคุณอยู่ในเขตจัดส่งของร้านค้าที่คุณชื่นชอบหรือไม่
          ลงทะเบียนตอนนี้เพื่อเริ่มต้นการเดินทางของคุณกับเรา!
          </p>
          <a href="/Register" className="btn btn-lg btn-success mt-6">
          เริ่มต้นใช้งานฟรี
        </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
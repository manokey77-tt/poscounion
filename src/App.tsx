import { useState, useEffect, useCallback } from 'react';
import { 
  Menu, 
  Network, 
  MessageCircle, 
  Phone,
  MessageSquare,
  ChevronRight, 
  CheckCircle2, 
  Zap, 
  Calculator, 
  Gift, 
  Users, 
  Wifi, 
  Tv, 
  Headphones,
  Copy,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Toast = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-24 left-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700"
        >
          <div className="bg-green-500 rounded-full p-1">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold whitespace-nowrap">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="flex justify-between items-center px-5 py-4 max-w-screen-xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Network className="text-white w-5 h-5" />
        </div>
        <span className="text-lg font-bold text-primary tracking-tight">[LG U+ 협업몰]</span>
      </div>
      <button className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors">
        <Menu className="text-slate-600 w-5 h-5" />
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative px-6 py-16 md:py-24 overflow-hidden text-center pastel-gradient">
    <div className="absolute top-10 left-10 w-32 h-32 bg-white/40 rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl"></div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 max-w-3xl mx-auto"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span className="text-xs font-bold text-primary tracking-wide">[포스코 노동조합 협업몰 단독] LG U+ 특별 혜택</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-lg md:text-xl font-bold text-slate-500 mb-2"
      >
        인터넷+TV만 했는데
      </motion.div>
      
      <h1 className="font-black text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 text-slate-900 whitespace-nowrap">
        현금 + 사은품 <span className="text-primary underline decoration-soft-yellow decoration-8 underline-offset-4">90만원 즉시 증정!</span>
      </h1>
      
      <p className="text-slate-600 text-base md:text-lg font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
        포스코 조합원님들의 통신비 부담을 덜어드리기 위해 노동조합 협업몰이 직접 준비했습니다.<br className="hidden md:block" />
        일반 대리점과는 차원이 다른 조합원 전용 단독 정책을 지금 확인하세요.
      </p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 2 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-16 relative max-w-lg mx-auto"
    >
      <div className="bg-white p-4 rounded-3xl shadow-xl">
        <img 
          alt="Main Banner Image" 
          className="w-full h-56 object-cover rounded-2xl" 
          src="banner.jpg"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to picsum if banner.jpg is missing
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/cherry-blossom-lake/1200/800";
          }}
        />
      </div>
      <div className="absolute -bottom-6 -right-4 bg-yellow-400 p-4 rounded-full shadow-lg border-4 border-white animate-bounce">
        <Gift className="text-white w-8 h-8" />
      </div>
    </motion.div>
  </section>
);

const PlanSelector = () => {
  const plans = [
    { id: '1G_BASIC', name: '인터넷 1기가 + TV 실속형', price: '44,000', originalPrice: '58,300', savings: '14,300', support: '85만원', isBest: false },
    { id: '1G_PREMIUM', name: '인터넷 1기가 + TV 프리미엄', price: '47,300', originalPrice: '61,600', savings: '14,300', support: '90만원', isBest: true },
    { id: '500M_BASIC', name: '인터넷 500메가 + TV 실속형', price: '41,800', originalPrice: '56,100', savings: '14,300', support: '75만원', isBest: false },
    { id: '500M_PREMIUM', name: '인터넷 500메가 + TV 프리미엄', price: '45,100', originalPrice: '59,400', savings: '14,300', support: '80만원', isBest: false },
  ];
  const [selectedPlanId, setSelectedPlanId] = useState(plans[1].id); // Default to 1G Premium
  const [showToast, setShowToast] = useState(false);
  const currentPlan = plans.find(p => p.id === selectedPlanId) || plans[0];

  const handleConsultation = useCallback(() => {
    const textToCopy = `[포스코 협업몰 상담 신청]
상품명: ${currentPlan.name}
월 요금: ${currentPlan.price}원
지원 혜택: ${currentPlan.support}

위 내용으로 상담 신청합니다.`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowToast(true);
      // Optional: Open KakaoTalk link after a short delay
      setTimeout(() => {
        // window.location.href = '카톡링크'; 
      }, 1000);
    });
  }, [currentPlan]);
  
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <Toast 
        message="상품 정보가 복사되었습니다! 카톡에 붙여넣어주세요." 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-50/50">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>스마트 요금 계산기</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">내게 딱 맞는 요금 찾기</h2>
          <p className="text-slate-500 max-w-md">어떤 상품이 나에게 유리할지 단계별로 확인해보세요!</p>
        </div>

        <div className="bg-white rounded-[3rem] p-6 md:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 relative">
          {/* Steps Indicator - Modern Style */}
          <div className="flex items-center justify-center gap-4 md:gap-12 mb-12">
            {[
              { step: 1, label: '상품 선택', active: true },
              { step: 2, label: '혜택 확인', active: false },
              { step: 3, label: '상담 완료', active: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                  s.active ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' : 'bg-slate-100 text-slate-400'
                }`}>
                  {s.step}
                </div>
                <span className={`text-sm font-bold hidden sm:block ${s.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {s.label}
                </span>
                {i < 2 && <div className="w-8 md:w-16 h-[2px] bg-slate-100 ml-2"></div>}
              </div>
            ))}
          </div>

          {/* Plan Tabs - Segmented Control Style */}
          <div className="p-1.5 bg-slate-100/80 rounded-2xl mb-10 flex flex-wrap lg:flex-nowrap gap-1">
            {plans.map((plan) => (
              <button 
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`flex-1 py-4 px-3 rounded-xl font-bold text-xs md:text-sm transition-all relative ${
                  selectedPlanId === plan.id 
                  ? 'bg-white text-primary shadow-md ring-1 ring-slate-200/50' 
                  : 'text-slate-500 hover:bg-white/50'
                }`}
              >
                {plan.isBest && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                    Best
                  </span>
                )}
                {plan.name.replace('인터넷 ', '')}
              </button>
            ))}
          </div>

          {/* Plan Details Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedPlanId}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Side: Features */}
              <div className="lg:col-span-7 bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                      <Zap className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">{currentPlan.name}</h3>
                      <p className="text-slate-400 text-xs font-medium mt-1">포스코 조합원 전용 단독 혜택가</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { text: '끊김 없는 기가급 속도', desc: '대용량 파일 전송 및 고화질 영상 시청에 최적화' },
                      { text: '최신 Wi-Fi 공유기 2대 증정', desc: '우리 집 어디서든 빵빵하게 터지는 무선 인터넷' },
                      { text: '넷플릭스/디즈니+ 할인권 제공', desc: '인기 OTT 서비스를 더 저렴하게 즐기세요' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="mt-1 bg-green-100 rounded-full p-0.5">
                          <CheckCircle2 className="text-green-600 w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold text-sm">{item.text}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/60 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="user" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">현재 <span className="text-primary font-bold">124명</span>의 조합원이 이 요금을 보고 있습니다.</p>
                </div>
              </div>
              
              {/* Right Side: Price & Support */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Support Amount Highlight */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-primary text-white p-8 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden group"
                >
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-white/20 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Cash Back</span>
                      <Gift className="w-6 h-6 text-yellow-300 animate-pulse" />
                    </div>
                    <p className="text-blue-100 text-xs font-bold mb-1">현금 사은품 + 상품권 즉시 증정</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tighter">{currentPlan.support}</span>
                      <span className="text-lg font-bold opacity-80">지원</span>
                    </div>
                  </div>
                </motion.div>

                {/* Price Card */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg flex flex-col items-center text-center justify-center flex-1">
                  <p className="text-slate-400 text-xs line-through mb-1">정상가 월 {currentPlan.originalPrice}원</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-slate-500 text-lg font-bold">월</span>
                    <span className="text-primary text-4xl font-black tracking-tight">{currentPlan.price}</span>
                    <span className="text-slate-900 text-xl font-bold">원</span>
                  </div>
                  <div className="bg-soft-blue text-primary text-[11px] font-black px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6">
                    <Zap className="w-3 h-3 fill-primary" />
                    월 {currentPlan.savings}원 추가 할인 적용됨
                  </div>
                  
                  <button 
                    onClick={handleConsultation}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    이 요금으로 상담 신청하기
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};


const FAQ = () => {
  const faqs = [
    {
      q: "정말 포스코 노조원 전용인가요?",
      a: "네, 본 혜택은 포스코 노동조합 협업몰과 LG U+가 제휴하여 오직 포스코 조합원 및 가족분들께만 제공되는 폐쇄형 단독 혜택입니다."
    },
    {
      q: "현금 사은품 90만원은 언제 받나요?",
      a: "인터넷 및 TV 설치 완료 후, 영업일 기준 즉시 또는 최대 1일 이내에 약정된 계좌로 안전하게 입금해 드립니다."
    },
    {
      q: "기존 통신사 위약금이 걱정됩니다.",
      a: "상담 신청 시 현재 이용 중인 상품의 약정 정보를 알려주시면, 위약금을 최소화하거나 상쇄할 수 있는 최적의 결합 설계를 무료로 도와드립니다."
    },
    {
      q: "임직원 인증 절차는 복잡한가요?",
      a: "아니요, 상담 신청 후 간단한 사원증 확인 또는 협업몰 가입 여부만 체크하면 바로 혜택 적용이 가능합니다."
    }
  ];

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">자주 묻는 질문</h2>
        <p className="text-slate-500">조합원님들이 가장 궁금해하시는 내용을 모았습니다.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
              <span className="text-primary font-black">Q.</span>
              {faq.q}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Benefits = () => (
  <section className="py-20 px-6 bg-soft-blue/30">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">놓치면 아쉬운 BEST 5 혜택</h2>
        <p className="text-slate-500">임직원 가족분들께만 드리는 풍성한 혜택입니다.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Gift, title: '최대 현금 사은품', desc: '신규 가입 시 실망 없는 빵빵한 사은품과 상품권 혜택을 드려요.', color: 'bg-blue-100 text-primary' },
          { icon: Users, title: '결합 할수록 커지는 혜택', desc: '가족끼리 묶으면 매달 나가는 통신비가 한번 더 줄어듭니다.', color: 'bg-yellow-100 text-yellow-700' },
          { icon: Wifi, title: '최신 Wi-Fi 기기 2대를 무상 임대', desc: '우리 집 어디서든 빵빵하게! 최신 공유기를 무상으로 빌려드려요.', color: 'bg-green-100 text-green-700' },
          { icon: Tv, title: '프리미엄 채널 무제한', desc: '250여 개의 다양한 채널로 지루할 틈 없는 홈라이프를 즐기세요.', color: 'bg-purple-100 text-purple-700' },
        ].map((benefit, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-white transition-all group"
          >
            <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <benefit.icon className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold mb-3">{benefit.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
          </motion.div>
        ))}
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-primary p-8 rounded-3xl shadow-xl lg:col-span-2 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
        >
          <div className="relative z-10 flex-1">
            <h4 className="text-xl font-bold mb-3">임직원 전담자 콜 상담</h4>
            <p className="text-blue-100 text-sm leading-relaxed">기다림 없이 바로 연결! 임직원만을 위한 전문 상담원이 친절하게 답변해 드립니다.</p>
            <button className="mt-6 bg-white text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors">
              지금 연결하기
            </button>
          </div>
          <div className="relative z-10">
            <Headphones className="w-24 h-24 opacity-30" />
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-16 bg-white border-t border-slate-100 px-8 pb-32">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center">
              <Network className="text-slate-500 w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800">[LG U+ 협업몰]</span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm">본 서비스는 공식 제휴 파트너사를 통해 제공되는 포스코 임직원 전용 혜택입니다.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">이용 안내</span>
            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">이용약관</a>
            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">개인정보처리방침</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">바로가기</span>
            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">사은품 안내</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">고객지원</span>
            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">1:1 상담</a>
            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">자주 묻는 질문</a>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-50 text-center">
        <p className="text-xs text-slate-400">© 2024 LG Uplus Corp. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const BottomNav = () => (
  <div className="fixed bottom-0 w-full flex justify-center items-center p-4 z-50 pointer-events-none">
    <div className="bg-white/90 backdrop-blur-xl w-full max-w-sm rounded-3xl border border-slate-200 flex justify-between items-center px-2 py-2 shadow-2xl pointer-events-auto">
      <a className="flex-1 text-slate-400 flex flex-col items-center py-2 hover:text-primary transition-all" href="tel:1234-5678">
        <Phone className="w-6 h-6" />
        <span className="text-[10px] font-bold mt-1">전화</span>
      </a>
      <a className="bg-[#FEE500] text-[#3c1e1e] rounded-2xl py-3 px-6 flex items-center gap-2 shadow-lg shadow-yellow-500/30 transition-transform hover:scale-105 active:scale-95" href="#">
        <MessageCircle className="w-5 h-5 fill-[#3c1e1e]" />
        <span className="font-bold text-xs">카카오톡</span>
      </a>
      <a className="flex-1 text-slate-400 flex flex-col items-center py-2 hover:text-primary transition-all" href="sms:1234-5678">
        <MessageSquare className="w-6 h-6" />
        <span className="text-[10px] font-bold mt-1">문자</span>
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <PlanSelector />
        <FAQ />
        <Benefits />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

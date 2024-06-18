import { Icons } from '@/components/Icons'
import { LucideProps } from 'lucide-react'

interface NavMenu {
  label: string
  value: string
  icon: (props: LucideProps) => JSX.Element
  href?: string
  children?: Array<{
    label: string
    href: string
  }>
}

export const NAV_MENUS: Array<NavMenu> = [
  {
    label: '分类',
    value: 'categories' as const,
    icon: Icons.folder,
    children: [
      // {
      //   label: 'Spring Boot',
      //   href: '/pageNum=1&pageSize=5?categoryId='
      // },
      // {
      //   label: 'MySQL',
      //   href: '/products?category=ui_kits&sort=desc'
      // },
      // {
      //   label: 'Web',
      //   href: '/products?category=ui_kits&sort=desc'
      // },
      // {
      //   label: 'Linux',
      //   href: '/products?category=ui_kits&sort=desc'
      // },
      // {
      //   label: 'Vue',
      //   href: '/products?category=ui_kits&sort=desc'
      // }
    ]
  },
  {
    label: '标签',
    value: 'labels' as const,
    icon: Icons.tags,
    children: [
      // {
      //   label: 'Spring Boot',
      //   href: '/products?category=ui_kits'
      // },
      // {
      //   label: 'MySQL',
      //   href: '/products?category=ui_kits&sort=desc'
      // },
      // {
      //   label: 'Web',
      //   href: '/products?category=ui_kits&sort=desc'
      // },
      // {
      //   label: 'Linux',
      //   href: '/products?category=ui_kits&sort=desc'
      // },
      // {
      //   label: 'Vue',
      //   href: '/products?category=ui_kits&sort=desc'
      // }
    ]
  },
  {
    label: '留言板',
    value: 'messageboard' as const,
    icon: Icons.messageboard,
    href: '/messageboard'
  },
  {
    label: '友链',
    value: 'friend' as const,
    icon: Icons.friend,
    href: '/friend'
  }
]

export const MOTTOS = [
  {
    chinese: '任何想要真正干点事儿的人都是有自律性的。',
    english: 'Anyone who has ever made anything of importance was disciplined.',
    source: '— Andrew Hendrixson'
  },
  {
    chinese: '不要老是浪费时间敲打墙壁，想办法把它变成一扇门。',
    english:
      'Don’t spend time beating on a wall, hoping to transform it into a door.',
    source: '— Coco Chanel'
  },
  {
    chinese: '记得未雨绸缪，诺亚建方舟时并没有下雨。',
    english: 'It wasn’t raining when Noah built the ark.',
    source: '— Howard Ruff'
  },
  {
    chinese: '世上没有通往快乐的路，快乐本身就是那条路。',
    english: 'There is no way to happiness. Happiness is the way.',
    source: '— Thich Nhat Hanh'
  },
  {
    chinese: '记得未雨绸缪，诺亚建方舟时并没有下雨。',
    english: 'It wasn’t raining when Noah built the ark.',
    source: '— Howard Ruff'
  }
]

export const GIF_LIST = [
  { title: '微笑', url: '/gif/weixiao.gif' },
  { title: '嘻嘻', url: '/gif/xixi.gif' },
  { title: '哈哈', url: '/gif/haha.gif' },
  { title: '可爱', url: '/gif/keai.gif' },
  { title: '可怜', url: '/gif/kelian.gif' },
  { title: '挖鼻', url: '/gif/wabi.gif' },
  { title: '吃惊', url: '/gif/chijing.gif' },
  { title: '害羞', url: '/gif/haixiu.gif' },
  { title: '挤眼', url: '/gif/jiyan.gif' },
  { title: '闭嘴', url: '/gif/bizui.gif' },
  { title: '鄙视', url: '/gif/bishi.gif' },
  { title: '委屈', url: '/gif/weiqu.gif' },
  { title: '爱你', url: '/gif/aini.gif' },
  { title: '泪', url: '/gif/lei.gif' },
  { title: '偷笑', url: '/gif/touxiao.gif' },
  { title: '亲亲', url: '/gif/qinqin.gif' },
  { title: '生病', url: '/gif/shengbing.gif' },
  { title: '太开心', url: '/gif/taikaixin.gif' },
  { title: '白眼', url: '/gif/baiyan.gif' },
  { title: '右哼哼', url: '/gif/youhengheng.gif' },
  { title: '左哼哼', url: '/gif/zuohengheng.gif' },
  { title: '嘘', url: '/gif/xu.gif' },
  { title: '衰', url: '/gif/shuai.gif' },
  { title: '吐', url: '/gif/tu.gif' },
  { title: '哈欠', url: '/gif/haqian.gif' },
  { title: '抱抱', url: '/gif/baobao.gif' },
  { title: '怒', url: '/gif/nu.gif' },
  { title: '疑问', url: '/gif/yiwen.gif' },
  { title: '馋嘴', url: '/gif/chanzui.gif' },
  { title: '拜拜', url: '/gif/baibai.gif' },
  { title: '思考', url: '/gif/sikao.gif' },
  { title: '汗', url: '/gif/han.gif' },
  { title: '困', url: '/gif/kun.gif' },
  { title: '睡', url: '/gif/shui.gif' },
  { title: '钱', url: '/gif/qian.gif' },
  { title: '失望', url: '/gif/shiwang.gif' },
  { title: '酷', url: '/gif/ku.gif' },
  { title: '色', url: '/gif/se.gif' },
  { title: '哼', url: '/gif/heng.gif' },
  { title: '鼓掌', url: '/gif/guzhang.gif' },
  { title: '晕', url: '/gif/yun.gif' },
  { title: '悲伤', url: '/gif/beishang.gif' },
  { title: '抓狂', url: '/gif/zhuakuang.gif' },
  { title: '黑线', url: '/gif/heixian.gif' },
  { title: '阴险', url: '/gif/yinxian.gif' },
  { title: '怒骂', url: '/gif/numa.gif' },
  { title: '互粉', url: '/gif/hufen.gif' },
  { title: '书呆子', url: '/gif/shudaizi.gif' },
  { title: '愤怒', url: '/gif/fennu.gif' },
  { title: '感冒', url: '/gif/ganmao.gif' },
  { title: '心', url: '/gif/xin.gif' },
  { title: '伤心', url: '/gif/shangxin.gif' },
  { title: '猪', url: '/gif/zhu.gif' },
  { title: '熊猫', url: '/gif/xiongmao.gif' },
  { title: '兔子', url: '/gif/tuzi.gif' },
  { title: '喔克', url: '/gif/ok.gif' },
  { title: '耶', url: '/gif/ye.gif' },
  { title: '棒棒', url: '/gif/good.gif' },
  { title: '不', url: '/gif/no.gif' },
  { title: '赞', url: '/gif/zan.gif' },
  { title: '来', url: '/gif/lai.gif' },
  { title: '弱', url: '/gif/ruo.gif' },
  { title: '草泥马', url: '/gif/caonima.gif' },
  { title: '神马', url: '/gif/shenma.gif' },
  { title: '囧', url: '/gif/jiong.gif' },
  { title: '浮云', url: '/gif/fuyun.gif' },
  { title: '给力', url: '/gif/geili.gif' },
  { title: '围观', url: '/gif/weiguan.gif' },
  { title: '威武', url: '/gif/weiwu.gif' },
  { title: '话筒', url: '/gif/huatong.gif' },
  { title: '蜡烛', url: '/gif/lazhu.gif' },
  { title: '蛋糕', url: '/gif/dangao.gif' },
  { title: '发红包', url: '/gif/fahongbao.gif' }
]

export const EMOJI_LIST = [
  { title: 'weibo_smile', url: '/emoji/weibo_smile.png' },
  { title: 'weibo_lovely', url: '/emoji/weibo_lovely.png' },
  { title: 'weibo_blush', url: '/emoji/weibo_blush.png' },
  { title: 'weibo_grin', url: '/emoji/weibo_grin.png' },
  { title: 'weibo_laugh', url: '/emoji/weibo_laugh.png' },
  { title: 'weibo_joy', url: '/emoji/weibo_joy.png' },
  { title: 'weibo_angry', url: '/emoji/weibo_angry.png' },
  { title: 'weibo_bye', url: '/emoji/weibo_bye.png' },
  { title: 'weibo_hammer', url: '/emoji/weibo_hammer.png' },
  { title: 'weibo_kiss', url: '/emoji/weibo_kiss.png' },
  { title: 'weibo_love', url: '/emoji/weibo_love.png' },
  { title: 'weibo_mask', url: '/emoji/weibo_mask.png' },
  { title: 'weibo_money', url: '/emoji/weibo_money.png' },
  { title: 'weibo_quiet', url: '/emoji/weibo_quiet.png' },
  { title: 'weibo_rage', url: '/emoji/weibo_rage.png' },
  { title: 'weibo_sad', url: '/emoji/weibo_sad.png' },
  { title: 'weibo_shy', url: '/emoji/weibo_shy.png' },
  { title: 'weibo_sick', url: '/emoji/weibo_sick.png' },
  { title: 'weibo_slient', url: '/emoji/weibo_slient.png' },
  { title: 'weibo_smirk', url: '/emoji/weibo_smirk.png' },
  { title: 'weibo_slap', url: '/emoji/weibo_slap.png' },
  { title: 'weibo_antic', url: '/emoji/weibo_antic.png' },
  { title: 'weibo_desire', url: '/emoji/weibo_desire.png' },
  { title: 'weibo_longing', url: '/emoji/weibo_longing.png' },
  { title: 'weibo_no_idea', url: '/emoji/weibo_no_idea.png' },
  { title: 'weibo_look_down', url: '/emoji/weibo_look_down.png' },
  { title: 'weibo_clap', url: '/emoji/weibo_clap.png' },
  { title: 'weibo_yum', url: '/emoji/weibo_yum.png' },
  { title: 'weibo_sleep', url: '/emoji/weibo_sleep.png' },
  { title: 'weibo_dizzy_face', url: '/emoji/weibo_dizzy_face.png' },
  { title: 'weibo_chuckle', url: '/emoji/weibo_chuckle.png' },
  { title: 'weibo_disappointed', url: '/emoji/weibo_disappointed.png' },
  { title: 'weibo_flushed', url: '/emoji/weibo_flushed.png' },
  { title: 'weibo_heart_eyes', url: '/emoji/weibo_heart_eyes.png' },
  { title: 'weibo_no', url: '/emoji/weibo_no.png' },
  { title: 'weibo_shuai', url: '/emoji/weibo_shuai.png' },
  { title: 'weibo_suprised', url: '/emoji/weibo_suprised.png' },
  { title: 'weibo_think', url: '/emoji/weibo_think.png' },
  { title: 'weibo_vomit', url: '/emoji/weibo_vomit.png' },
  { title: 'weibo_scream', url: '/emoji/weibo_scream.png' },
  { title: 'weibo_sleepy', url: '/emoji/weibo_sleepy.png' },
  { title: 'weibo_sob', url: '/emoji/weibo_sob.png' },
  { title: 'weibo_sunglasses', url: '/emoji/weibo_sunglasses.png' },
  { title: 'weibo_greddy', url: '/emoji/weibo_greddy.png' },
  { title: 'weibo_pick_nose', url: '/emoji/weibo_pick_nose.png' },
  { title: 'weibo_annoyed', url: '/emoji/weibo_annoyed.png' },
  { title: 'weibo_awkward', url: '/emoji/weibo_awkward.png' },
  { title: 'weibo_confused', url: '/emoji/weibo_confused.png' },
  { title: 'weibo_grievance', url: '/emoji/weibo_grievance.png' },
  { title: 'weibo_poor', url: '/emoji/weibo_poor.png' },
  { title: 'weibo_wink', url: '/emoji/weibo_wink.png' },
  { title: 'weibo_rolling_eyes', url: '/emoji/weibo_rolling_eyes.png' },
  { title: 'weibo_watermalon', url: '/emoji/weibo_watermalon.png' },
  { title: 'weibo_annoyed_left', url: '/emoji/weibo_annoyed_left.png' },
  { title: 'weibo_annoyed_right', url: '/emoji/weibo_annoyed_right.png' },
  { title: 'weibo_yawn', url: '/emoji/weibo_yawn.png' },
  { title: 'weibo_hufen', url: '/emoji/weibo_hufen.png' },
  { title: 'weibo_doge', url: '/emoji/weibo_doge.png' },
  { title: 'weibo_husky', url: '/emoji/weibo_husky.png' },
  { title: 'weibo_dog_annoyed', url: '/emoji/weibo_dog_annoyed.png' },
  { title: 'weibo_dog_bye', url: '/emoji/weibo_dog_bye.png' },
  { title: 'weibo_dog_consider', url: '/emoji/weibo_dog_consider.png' },
  { title: 'weibo_dog_cry', url: '/emoji/weibo_dog_cry.png' },
  { title: 'weibo_dog_joy', url: '/emoji/weibo_dog_joy.png' },
  { title: 'weibo_dog_laugh', url: '/emoji/weibo_dog_laugh.png' },
  { title: 'weibo_dog_sweat', url: '/emoji/weibo_dog_sweat.png' },
  { title: 'weibo_dog_think', url: '/emoji/weibo_dog_think.png' },
  { title: 'weibo_dog_yum', url: '/emoji/weibo_dog_yum.png' },
  { title: 'weibo_cat', url: '/emoji/weibo_cat.png' },
  { title: 'weibo_cat_annoyed', url: '/emoji/weibo_cat_annoyed.png' },
  { title: 'weibo_cat_bye', url: '/emoji/weibo_cat_bye.png' },
  { title: 'weibo_cat_cry', url: '/emoji/weibo_cat_cry.png' },
  { title: 'weibo_cat_think', url: '/emoji/weibo_cat_think.png' },
  { title: 'weibo_girl_annoyed', url: '/emoji/weibo_girl_annoyed.png' },
  { title: 'weibo_boy', url: '/emoji/weibo_boy.png' },
  { title: 'weibo_girl', url: '/emoji/weibo_girl.png' },
  { title: 'weibo_panda', url: '/emoji/weibo_panda.png' },
  { title: 'weibo_pig', url: '/emoji/weibo_pig.png' },
  { title: 'weibo_rabbit', url: '/emoji/weibo_rabbit.png' },
  { title: 'weibo_ultraman', url: '/emoji/weibo_ultraman.png' },
  { title: 'weibo_wool_group', url: '/emoji/weibo_wool_group.png' },
  { title: 'weibo_yan', url: '/emoji/weibo_yan.png' },
  { title: 'weibo_xi', url: '/emoji/weibo_xi.png' },
  { title: 'weibo_soap', url: '/emoji/weibo_soap.png' },
  { title: 'weibo_meng', url: '/emoji/weibo_meng.png' },
  { title: 'weibo_jiong', url: '/emoji/weibo_jiong.png' },
  { title: 'weibo_geili', url: '/emoji/weibo_geili.png' },
  { title: 'weibo_shenma', url: '/emoji/weibo_shenma.png' },
  { title: 'weibo_alpaca', url: '/emoji/weibo_alpaca.png' }
]

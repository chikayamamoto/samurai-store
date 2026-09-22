import Link from 'next/link';
import Image from 'next/image';

// 共通フッター
export default function Footer() {
    const currentYear = new Date().getFullYear(); // 現在の年を取得

    return (
        <footer>
            <div>
                <h3>SAMURAI Storeについて</h3>
                <p>最新のトレンドとテクノロジーを取り入れたアイテムをお届けします。</p>
            </div>

            <div>
                <h3>クイックリンク</h3>
                <ul>
                    <li><Link href="/privacy">プライバシーポリシー</Link></li>
                    <li><Link href="/terms">利用規約</Link></li>
                </ul>
            </div>

            <div>
                <h3>お問い合わせ</h3>
                <p><Link href="/contact">お問い合わせはこちら</Link></p>
                <div>
                    <Image src="/icons/facebook-icon.png" alt="Facebook" width={24} height={24} />
                    <Image src="/icons/x-icon.svg" alt="X" width={24} height={24} />
                    <Image src="/icons/youtube-icon.svg" alt="YouTube" width={24} height={24} />
                </div>
            </div>

            <div>
                <p>&copy; {currentYear} SAMURAI Store. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
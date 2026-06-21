import { Metadata } from 'next';
import { Changelogs } from "../../components/Changelogs";

export const metadata: Metadata = {
  title: "Changelogs | ShonenX",
  description: "Track the evolution of ShonenX. Stay up to date with the latest features, improvements, and bug fixes.",
};

export default function ChangelogsPage() {
  return <Changelogs />;
}

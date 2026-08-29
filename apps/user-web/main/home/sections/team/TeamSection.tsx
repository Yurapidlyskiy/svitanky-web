import { TeamMemberCard } from './TeamMemberCard';

// TODO: replace `photo: undefined` with the real headshot ({ src, alt }) as
// they become available — TeamMemberCard already renders it when present.
const TEAM = [
  {
    name: 'О. Сергій Паламарчук',
    photo: undefined,
    role: 'Господарська / адміністративна діяльність/ духівник',
  },
  { name: 'Михайло Костів', photo: undefined, role: 'Координатор' },
  { name: 'Марія Горечко', photo: undefined, role: 'Фандрайзер/ Фінанси' },
  {
    name: 'Ольга Підліська',
    photo: undefined,
    role: 'Програмний менеджер, координатор виховників',
  },
  {
    name: 'Юрій Підліський',
    photo: undefined,
    role: 'Розробник сайту, координатор волонтерської роботи',
  },
  { name: 'Анастасія Пантелей', photo: undefined, role: 'SMM, дизайнер' },
  { name: 'Ангеліна Гридковець', photo: undefined, role: 'Помічник SMM' },
  { name: 'Софія Вовк', photo: undefined, role: 'Партнерства' },
  { name: 'Остап Лалюк', photo: undefined, role: 'Виховник' },
  { name: 'Данило Магро', photo: undefined, role: 'Виховник' },
  { name: 'Алєся', photo: undefined, role: 'Виховник' },
  { name: 'Софія Ганьба', photo: undefined, role: 'Виховник' },
  { name: 'Андріана Горечко', photo: undefined, role: 'Виховник' },
];

export function TeamSection() {
  return (
    <section
      aria-label="Наша команда"
      className="bg-[#FFFDF8] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20 xl:px-[12vw]"
      id="team"
    >
      <h2 className="text-center font-heading text-4xl font-black uppercase text-sky-800 sm:text-5xl">
        Наша команда
      </h2>
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {TEAM.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            photo={member.photo}
            role={member.role}
          />
        ))}
      </div>
    </section>
  );
}

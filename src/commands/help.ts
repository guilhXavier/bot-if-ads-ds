import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription(
    'Esse comando serve para tirar dúvidas sobre o funcionamento do bot.'
  );

const helpCommandInteraction = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const helpEmbed = new EmbedBuilder()
    .setTitle('Bot do Discord do IFSUL - TADS & TDS')
    .setImage(
      'https://media.licdn.com/dms/image/C4D0BAQEbuIJLc7hG5A/company-logo_200_200/0/1533322764766?e=2147483647&v=beta&t=cxhOWvGv4YMh9Br4k1_0BeCzLE47syBMCSHoI0lOTqQ'
    )
    .setColor(0x2f9e41)
    .setAuthor({ name: 'Coord. IFSUL' })
    .setDescription(
      'Este é o Bot feito para os Discords dos cursos de TADS & TDS. A sua funcão é validar os alunos dos cursos e incluí-los nos respectivos canais para poderem tirar dúvidas e participar da comunicacão ativa do curso. O bot possui dois comandos principais: '
    )
    .addFields(
      {
        name: '/iniciar-validacao',
        value:
          'Esse comando é responsável por iniciar a validacão do aluno no Discord do curso. Seu único argumento consiste no email academico do aluno, para onde será enviado um token necessário para finalizar a validacão no próximo comando.',
      },
      {
        name: '/finalizar-validacao',
        value:
          'Esse comando é responsável por finalizar a validacão do aluno no Discord do curso por meio de um token que é enviado para o email academico do aluno. O aluno, se corretamente validado, será incluído no cargo de ESTUDANTE e nos canais das matérias onde está matriculado.',
      }
    );

  await interaction.reply({ embeds: [helpEmbed] });
};

export { helpCommand, helpCommandInteraction };

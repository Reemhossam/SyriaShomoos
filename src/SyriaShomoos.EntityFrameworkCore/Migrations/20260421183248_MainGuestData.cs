using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SyriaShomoos.Migrations
{
    /// <inheritdoc />
    public partial class MainGuestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrentResidenceCountry",
                table: "Guests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IssueCountry",
                table: "Guests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MotherName",
                table: "Guests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlaceOfBirth",
                table: "Guests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Profession",
                table: "Guests",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentResidenceCountry",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "IssueCountry",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "MotherName",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "PlaceOfBirth",
                table: "Guests");

            migrationBuilder.DropColumn(
                name: "Profession",
                table: "Guests");
        }
    }
}

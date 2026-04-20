using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SyriaShomoos.Migrations
{
    /// <inheritdoc />
    public partial class addchanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Guests",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DateOfBirth",
                table: "Guests",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");
        }
    }
}

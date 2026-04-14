using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SyriaShomoos.Migrations
{
    /// <inheritdoc />
    public partial class ChangeSchemaAndIndecies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BranchSecretHash",
                table: "BranchSources",
                newName: "BranchName");

            migrationBuilder.AddColumn<DateTime>(
                name: "CancelDate",
                table: "Reservations",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckInDate",
                table: "Reservations",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckOutDate",
                table: "Reservations",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CancelDate",
                table: "Reservations",
                column: "CancelDate");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CheckInDate",
                table: "Reservations",
                column: "CheckInDate");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CheckOutDate",
                table: "Reservations",
                column: "CheckOutDate");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ExternalIdentifier",
                table: "Reservations",
                column: "ExternalIdentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_RoomNumber",
                table: "Reservations",
                column: "RoomNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_Status",
                table: "Reservations",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_CheckInDate",
                table: "Guests",
                column: "CheckInDate");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_CheckOutDate",
                table: "Guests",
                column: "CheckOutDate");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_FullName",
                table: "Guests",
                column: "FullName");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_IdentityNum",
                table: "Guests",
                column: "IdentityNum");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_Nationality",
                table: "Guests",
                column: "Nationality");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_VersionNumber",
                table: "Guests",
                column: "VersionNumber");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEscorts_CheckInDate",
                table: "GuestEscorts",
                column: "CheckInDate");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEscorts_CheckOutDate",
                table: "GuestEscorts",
                column: "CheckOutDate");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEscorts_FullName",
                table: "GuestEscorts",
                column: "FullName");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEscorts_IdentityNum",
                table: "GuestEscorts",
                column: "IdentityNum");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEscorts_Nationality",
                table: "GuestEscorts",
                column: "Nationality");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reservations_CancelDate",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_CheckInDate",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_CheckOutDate",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_ExternalIdentifier",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_RoomNumber",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_Status",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Guests_CheckInDate",
                table: "Guests");

            migrationBuilder.DropIndex(
                name: "IX_Guests_CheckOutDate",
                table: "Guests");

            migrationBuilder.DropIndex(
                name: "IX_Guests_FullName",
                table: "Guests");

            migrationBuilder.DropIndex(
                name: "IX_Guests_IdentityNum",
                table: "Guests");

            migrationBuilder.DropIndex(
                name: "IX_Guests_Nationality",
                table: "Guests");

            migrationBuilder.DropIndex(
                name: "IX_Guests_VersionNumber",
                table: "Guests");

            migrationBuilder.DropIndex(
                name: "IX_GuestEscorts_CheckInDate",
                table: "GuestEscorts");

            migrationBuilder.DropIndex(
                name: "IX_GuestEscorts_CheckOutDate",
                table: "GuestEscorts");

            migrationBuilder.DropIndex(
                name: "IX_GuestEscorts_FullName",
                table: "GuestEscorts");

            migrationBuilder.DropIndex(
                name: "IX_GuestEscorts_IdentityNum",
                table: "GuestEscorts");

            migrationBuilder.DropIndex(
                name: "IX_GuestEscorts_Nationality",
                table: "GuestEscorts");

            migrationBuilder.DropColumn(
                name: "CancelDate",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "CheckInDate",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "CheckOutDate",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "BranchName",
                table: "BranchSources",
                newName: "BranchSecretHash");
        }
    }
}

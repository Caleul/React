import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingHorizontal: 35,
  },
  info: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  clientInfo: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
  textHeader: {
    fontSize: 10,
    alignItems: 'center',
    fontFamily: 'Times-Roman',
  },
  textContent: {
    fontSize: 10,
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  table: {
    padding: 10,
  },
  signatures: {
    paddingTop: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signaturesBlocks: {
    width: 150,
    height: 1,
    backgroundColor: '#000',
  },
  finalLine: {
    marginTop: 30,
    alignItems: 'center',
    height: 1,
    backgroundColor: '#000',
  },
});

// Create Document Component
const RemittanceDoc = ({
  info: { orders, company, client, date, remittanceNumber },
}) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.body} wrap={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.textContent}>Remito: {remittanceNumber}</Text>
          </View>
          <View style={styles.info}>
            <View>
              <Text>{company.name}</Text>
              <Text>{company.address}</Text>
              <Text>
                {company.state}, {company.country}
              </Text>
              <Text>{date}</Text>
            </View>
            <View style={styles.clientInfo}>
              <Text>{client.name}</Text>
              <Text>{client.addresses[0].address}</Text>
              <Text>
                {client.addresses[0].state}, {client.addresses[0].country}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Presente:</Text>
            <Text style={styles.text}>
              Se confirma mediante este documento que la siguiente mercadería,
              detallada con su numero de pedido y especificaciones, fue recibida
              completa y en buen estado.
            </Text>
          </View>
          <View style={styles.table}>
            <Table data={orders}>
              <TableHeader>
                <TableCell style={styles.textHeader}>ORDEN</TableCell>
                <TableCell style={styles.textHeader}>CALIBRADO</TableCell>
                <TableCell style={styles.textHeader}>MATERIAL</TableCell>
                <TableCell style={styles.textHeader}>OD</TableCell>
                <TableCell style={styles.textHeader}>OI</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.ORDEN}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.CALIBRADO}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.MATERIAL}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OD}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OI}
                />
              </TableBody>
            </Table>
          </View>
          <View>
            <Text style={styles.text}>
              En caso de haber algún problema con la mercadería por favor
              comunicarse con el laboratorio para resolver lo mejor y más rápido
              posible. De la misma manera si tienen alguna duda o recomendación,
              no dude en llamar a nuestra empresa y estaremos felices en
              atenderle y escucharlo.
            </Text>
            <Text style={styles.text}>
              ( Una vez firmado el remito se acredita que la mercadería
              mencionada llego en perfecto estado y completa y no podrá ser
              devuelta. )
            </Text>
          </View>
          <View style={styles.signatures}>
            <View style={styles.signaturesBlocks} />
            <View style={styles.signaturesBlocks} />
          </View>
          <View style={styles.finalLine} />
        </View>
        <View style={styles.body} wrap={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.textContent}>Remito: {remittanceNumber}</Text>
          </View>
          <View style={styles.info}>
            <View>
              <Text>{company.name}</Text>
              <Text>{company.address}</Text>
              <Text>
                {company.state}, {company.country}
              </Text>
              <Text>{date}</Text>
            </View>
            <View style={styles.clientInfo}>
              <Text>{client.name}</Text>
              <Text>{client.addresses[0].address}</Text>
              <Text>
                {client.addresses[0].state}, {client.addresses[0].country}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Presente:</Text>
            <Text style={styles.text}>
              Se confirma mediante este documento que la siguiente mercadería,
              detallada con su numero de pedido y especificaciones, fue recibida
              completa y en buen estado.
            </Text>
          </View>
          <View style={styles.table}>
            <Table data={orders}>
              <TableHeader>
                <TableCell style={styles.textHeader}>ORDEN</TableCell>
                <TableCell style={styles.textHeader}>CALIBRADO</TableCell>
                <TableCell style={styles.textHeader}>MATERIAL</TableCell>
                <TableCell style={styles.textHeader}>OD</TableCell>
                <TableCell style={styles.textHeader}>OI</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.ORDEN}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.CALIBRADO}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.MATERIAL}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OD}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OI}
                />
              </TableBody>
            </Table>
          </View>
          <View>
            <Text style={styles.text}>
              En caso de haber algún problema con la mercadería por favor
              comunicarse con el laboratorio para resolver lo mejor y más rápido
              posible. De la misma manera si tienen alguna duda o recomendación,
              no dude en llamar a nuestra empresa y estaremos felices en
              atenderle y escucharlo.
            </Text>
            <Text style={styles.text}>
              ( Una vez firmado el remito se acredita que la mercadería
              mencionada llego en perfecto estado y completa y no podrá ser
              devuelta. )
            </Text>
          </View>
          <View style={styles.signatures}>
            <View style={styles.signaturesBlocks} />
            <View style={styles.signaturesBlocks} />
          </View>
          <View style={styles.finalLine} />
        </View>
      </Page>
    </Document>
  );
};

export default RemittanceDoc;
